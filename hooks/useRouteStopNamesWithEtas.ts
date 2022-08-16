import {useQueries, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query';
import _ from 'lodash';
import {useEffect, useState} from 'react';
import Route from '../schemas/Route';
import RouteStopNameWithEtas from '../schemas/RouteStopNameWithEtas';
import {useInterval} from './useInterval';

function getKmbDataOrDefault(kmbQueryResult: UseQueryResult, defaultValue: any = undefined): any {
  return kmbQueryResult.isSuccess ? (kmbQueryResult.data as any).data : defaultValue;
}

export default function useRouteStopNamesWithEtas({route, bound, service_type}: Route) {
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

  // get all stop names of the given route
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

  // get all stop eta of the given route
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

  const routeStopNamesWithEtas: RouteStopNameWithEtas[] = stopNameListData.map(
    (name_tc: string | undefined, index) => ({
      name_tc,
      eta: etaListData[index + 1],
    })
  );

  return {
    routeStopNamesWithEtas,
    isSuccess:
      stopIdListResult.isSuccess &&
      stopInfoListResult.every(r => r.isSuccess) &&
      etaListResult.isSuccess,
  };
}
