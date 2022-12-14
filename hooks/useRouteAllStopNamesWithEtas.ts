import {useQueries, useQuery, UseQueryResult} from '@tanstack/react-query';
import _ from 'lodash';
import {useEffect, useState} from 'react';
import Route from '../schemas/Route';
import StopNameWithEtas from '../schemas/StopNameWithEtas';

function getKmbDataOrDefault(kmbQueryResult: UseQueryResult, defaultValue: any = undefined): any {
  return kmbQueryResult.isSuccess ? (kmbQueryResult.data as any).data : defaultValue;
}

export default function useRouteAllStopNamesWithEtas({route, bound, service_type}: Route) {
  // update current time every second
  const [CurrentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const updateCurrentTimeInterval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(updateCurrentTimeInterval);
  }, []);

  // get all stop names of the given route
  const stopIdListResult = useQuery(
    ['route-stop', route, bound == 'I' ? 'inbound' : 'outbound', service_type],
    {staleTime: Infinity}
  );

  const stopInfoListResult = useQueries({
    queries: getKmbDataOrDefault(stopIdListResult, []).map((it: any) => ({
      queryKey: ['stop', it.stop],
      staleTime: Infinity,
    })),
  });

  const stopNameListData = stopInfoListResult.map(it => getKmbDataOrDefault(it)?.name_tc);

  // get all stop eta of the given route
  const etaListResult = useQuery(['route-eta', route, service_type], {refetchInterval: 5000});
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

  const routeAllStopNamesWithEtas: StopNameWithEtas[] = stopNameListData.map(
    (name_tc: string | undefined, index) => ({
      name_tc,
      eta: etaListData[index + 1],
    })
  );

  return {
    routeAllStopNamesWithEtas,
    isSuccess:
      stopIdListResult.isSuccess &&
      stopInfoListResult.every(r => r.isSuccess) &&
      etaListResult.isSuccess,
  };
}
