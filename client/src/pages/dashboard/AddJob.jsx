import Wrapper from './dashobardFormStyle';
import { FormRow, Alert, FormRowSelect } from '../../components';
import { useJobContext } from '../../context/jobContext/jobContext';
import { useAlertContext } from '../../context/alertContext/alertContext';

const AddJob = () => {
  const {
    isEditing,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    handleChange,
    clearValues,
    createJob,
    isLoading,
    editJob,
  } = useJobContext();
  const { showAlert, displayAlert } = useAlertContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!company || !position || !jobLocation) {
      displayAlert('danger', 'Please provide all values');
      return;
    }

    if (isEditing) {
      editJob();
      return;
    }

    createJob();
  };

  const handleJobInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    handleChange({ name, value });
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />

          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* job type */}
          <FormRowSelect
            labelText="type"
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
