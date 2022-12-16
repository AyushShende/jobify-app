import { useEffect } from 'react';
import { StatsContainer, ChartsContainer, Loading } from '../../components';
import { useJobContext } from '../../context/jobContext/jobContext';

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useJobContext();
  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <div>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </div>
  );
};
export default Stats;
