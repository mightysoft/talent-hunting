import React, { Fragment, useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap'; // reactstrap
import ReactMarkdown from 'react-markdown';

function EngineerHomePage() {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <h2>Welcome to Engineer Page!</h2>
      <br />
      <h5>All Job Posts :</h5>
      <br />
      <Card className='mb-3'>
        <Card.Body>
          <div className='d-flex justify-content-between'>
            <div>
              <Card.Title>
                Full Stack Developer -{' '}
                <span className='text-muted font-weight-light'>
                  International NGO Safety Organisation
                </span>
              </Card.Title>
              <Card.Subtitle className='text-muted mb-2'>
                {new Date('Wed Jul 22 08:25:01 UTC 2020').toLocaleDateString()}
              </Card.Subtitle>
              <Badge variant='secondary' className='mr-2'>
                Full Time
              </Badge>
              <Badge variant='secondary'>The Hague, The Netherlands</Badge>
            </div>
          </div>
          <Card.Text>
            <br />
            <Button variant='primary'>View Details</Button>
          </Card.Text>
          <Collapse>
            <div className='mt-4'>
              <p>Job Description</p>
              <p>Full-Stack Developer</p>
              <p>The Hague, Netherlands</p>
              <p>Organisation Background</p>
              <p>
                The International NGO Safety Organisation (INSO) is an
                international charity that supports the safety of aid workers by
                establishing safety coordination platforms in insecure contexts.
                INSO provides registered NGOs with a range of free services
                including real-time incident tracking, analytical reports,
                safety related data and mapping, crisis management support,
                staff orientations and training.
              </p>

              <p>
                INSO services help NGOs with their day-to-day risk management
                responsibilities and improve their overall situational awareness
                to support evidence-based humanitarian access decisions.
              </p>
            </div>
          </Collapse>
        </Card.Body>
      </Card>

      {/* job 2 */}
      <br />
      <Card className='mb-3'>
        <Card.Body>
          <div className='d-flex justify-content-between'>
            <div>
              <Card.Title>
                Senior Fullstack Engineer -{' '}
                <span className='text-muted font-weight-light'>RebelMouse</span>
              </Card.Title>
              <Card.Subtitle className='text-muted mb-2'>
                {new Date('Wed Jul 26 04:13:43 UTC 2020').toLocaleDateString()}
              </Card.Subtitle>
              <Badge variant='secondary' className='mr-2'>
                Full Time
              </Badge>
              <Badge variant='secondary'>worldwide</Badge>
            </div>
          </div>
          <Card.Text>
            <br />
            <Button
              onClick={() => setOpen(prevOpen => !prevOpen)}
              variant='primary'
            >
              {open ? 'Hide Details' : 'View Details'}
            </Button>
          </Card.Text>
          <Collapse in={open}>
            <div className='mt-4'>
              <p>Job Description</p>
              <p>Full-Stack Developer</p>
              <p>The Hague, Netherlands</p>
              <p>Organisation Background</p>
              <p>
                The International NGO Safety Organisation (INSO) is an
                international charity that supports the safety of aid workers by
                establishing safety coordination platforms in insecure contexts.
                INSO provides registered NGOs with a range of free services
                including real-time incident tracking, analytical reports,
                safety related data and mapping, crisis management support,
                staff orientations and training.
              </p>

              <p>
                INSO services help NGOs with their day-to-day risk management
                responsibilities and improve their overall situational awareness
                to support evidence-based humanitarian access decisions.
              </p>
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default EngineerHomePage;
