import {useQueries, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query';
import _ from 'lodash';
import {useEffect, useState} from 'react';
import {useInterval} from './useInterval';
import {Route} from './useStore';

function getKmbDataOrDefault(kmbQueryResult: UseQueryResult, defaultValue: any = undefined): any {
  return kmbQueryResult.isSuccess ? (kmbQueryResult.data as any).data : defaultValue;
}

export default function useStopNameToEtaList({
  route,
  bound,
  service_type,
}: Pick<Route, 'route' | 'bound' | 'service_type'>) {
  // periodically invalidate and update route-eta data
  const queryClient = useQueryClient();
  const updateQueryInterval = useInterval(() => {
    queryClient.invalidateQueries(['route-eta']);
  }, 1000 * 5);

  // update current time every second
  const [CurrentTime, setCurrentTime] = useState(Date.now());
  const updateCurrentTimeInterval = useInterval(() => {
    setCurrentTime(Date.now());
  }, 1000);

  useEffect(() => {
    updateQueryInterval.start();
    updateCurrentTimeInterval.start();
    return () => {
      updateQueryInterval.stop();
      updateCurrentTimeInterval.stop();
    };
  }, []);

  const stopIdListResult = useQuery([
    'route-stop',
    route,
    bound == 'I' ? 'inbound' : 'outbound',
    service_type,
  ]);

  const stopInfoListResult = useQueries({
    queries: getKmbDataOrDefault(stopIdListResult, []).map((it: any) => ({
      queryKey: ['stop', it.stop],
    })),
  });
  const stopNameListData = stopInfoListResult.map(it => getKmbDataOrDefault(it)?.name_tc);

  const etaListResult = useQuery(['route-eta', route, service_type]);
  const etaListData = _(getKmbDataOrDefault(etaListResult, []))
    .filter(it => it.dir === bound)
    .groupBy(it => it.seq)
    .mapValues(v =>
      _(v)
        .map(it => it.eta as string | null)
        .filter((etaInIso): etaInIso is string => !_.isNil(etaInIso))
        .map(etaInIso => (new Date(etaInIso).valueOf() - CurrentTime) / 1000)
        .map(tSecAfter => Math.trunc(tSecAfter))
        .map(tSecAfter => {
          const absTSecAfter = Math.abs(tSecAfter);
          return (
            (Math.sign(tSecAfter) >= 0 ? '' : '-') +
            `${(Math.floor(absTSecAfter / 60).toString() + 'm').padEnd(6, ' ')}\t${
              absTSecAfter % 60
            }s`
          );
        })
        .value()
    )
    .value();

  const stopNameToEtaList = stopNameListData.map((name_tc: string | undefined, index) => ({
    name_tc,
    eta: etaListData[index + 1],
  }));

  return {
    stopNameToEtaList,
    isSuccess:
      stopIdListResult.isSuccess &&
      stopInfoListResult.every(r => r.isSuccess) &&
      etaListResult.isSuccess,
  };
}
