import React, { useState } from 'react';
import Link from 'next/link';
import loadable from '@loadable/component';

const ColorToggleButton = loadable(() => import('./ColorToggleButton.js'));
const Event = loadable(() => import('./Event.js'));

function ListView(props) {
  const [line, setLine] = useState(['not set', null]);

  const [view, setView] = useState('upcoming');

  function handleLine(index, status) {
    if (status === 'set line') {
      setLine(['set at index', index]);
    }
    if (status === 'already set') {
      setLine(['already set', index]);
    }
  }

  function convertToTime(seconds) {
    var seconds = seconds - 28800;
    var date = new Date(1970, 0, 1); // Epoch
    date = new Date(
      (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
      })
    );
    date.setSeconds(seconds);

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    return strTime;
  }

  function handleToggleChange(view) {
    setView(view);
  }

  return (
    <>
      {(view === 'upcoming' && props.upcomingEvents.length === 0) ||
      (view === 'completed' && props.pastEvents.length === 0) ? (
        <div>
          <div className='flex justify-around lg:justify-around'>
            <div className='self-center text-lg text-[#EFF1FA]  '>
              {props.selectedDate.toDateString().slice(0, -5)}
            </div>
            <div className=''>
              <ColorToggleButton handleToggleChange={handleToggleChange} />
            </div>
          </div>
          <div className='no-events mt-[20px] ml-5 text-[#A020F0]'>
            Oops, your calendar is empty.{' '}
            <div className='underline inline'>
              {' '}
              <br></br> <br></br>
              <Link className='text-[#A020F0]' href='/addBaby'>
                &quot;Add A Baby&quot;
              </Link>{' '}
            </div>
            {'or go to '}{' '}
            <div className='underline inline'>
              {' '}
              <Link href='/overview'>&quot;Baby Overview&quot;</Link>{' '}
            </div>{' '}
            to add feed/sleep events.
          </div>
        </div>
      ) : (
        <div>
          <div className='flex justify-around lg:justify-around'>
            <div className='self-center text-lg text-[#EFF1FA] '>
              {props.selectedDate.toDateString().slice(0, -5)}
            </div>
            <div className=''>
              <ColorToggleButton handleToggleChange={handleToggleChange} />
            </div>
          </div>

          <div className='list-view-container  mt-5 mb-10'>
            {props.sortedDayEvents.map((event, i, array) => {
              if (view === 'all') {
                return (
                  <Event
                    key={i}
                    handleLine={handleLine}
                    index={i}
                    line={line}
                    arrayLength={array.length}
                    foodMetric={event.foodMetric}
                    typeOfFood={event.foodType}
                    foodAmount={event.foodAmount}
                    type={event.type}
                    babyName={event.babyName}
                    eventStartTime={event.startTime.seconds}
                    startTime={convertToTime(event.startTime.seconds)}
                  />
                );
              } else {
                if (view === event.status) {
                  return (
                    <Event
                      key={i}
                      handleLine={handleLine}
                      index={i}
                      line={line}
                      arrayLength={array.length}
                      foodMetric={event.foodMetric}
                      typeOfFood={event.foodType}
                      foodAmount={event.foodAmount}
                      type={event.type}
                      babyName={event.babyName}
                      eventStartTime={event.startTime.seconds}
                      startTime={convertToTime(event.startTime.seconds)}
                    />
                  );
                }
              }
            })}
          </div>
        </div>
      )}
    </>
  );
}
export default ListView;
