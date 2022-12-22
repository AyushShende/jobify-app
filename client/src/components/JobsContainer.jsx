import Loading from './Loading';
import { useJobContext } from '../context/jobContext/jobContext';
import styled from 'styled-components';
import { useEffect } from 'react';
import Job from './Job';
import Alert from './Alert';
import PageBtnContainer from './PageBtnContainer';
import { useAlertContext } from '../context/alertContext/alertContext';

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;
const JobsContainer = () => {
  const {
    jobs,
    totalJobs,
    numOfPages,
    isLoading,
    getJobs,
    search,
    searchStatus,
    searchType,
    sort,
    page,
  } = useJobContext();

  const { showAlert } = useAlertContext();

  useEffect(() => {
    getJobs({ page, search, searchStatus, searchType, sort });
  }, [getJobs, page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job?._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
