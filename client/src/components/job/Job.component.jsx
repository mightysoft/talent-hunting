import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Badge,
  Button,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import dayjs from 'dayjs';

const Job = ({ job, user }) => {
  const history = useHistory();
  return (
    <Card className='mb-3'>
      <CardBody>
        <div className='d-flex justify-content-between'>
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardSubtitle className='text-muted mb-2'>
              {dayjs(job.createdAt).format('h:mm A, MMMM DD, YYYY')}
            </CardSubtitle>
            <Badge color='info' className='mr-2'>
              {job.type}
            </Badge>
            <Badge color='secondary'>{job.location}</Badge>
          </div>
        </div>
        <CardText>
          <br />

          <Button
            onClick={() =>
              user.role === 'engineer'
                ? history.push(`/job-info/${job._id}`)
                : history.push(`/job-explicit/${job._id}`)
            }
            color='primary'
          >
            View Details
          </Button>
        </CardText>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Job);
