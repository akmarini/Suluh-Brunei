import { ApplicationDeadline } from '../types';

export function getGoogleCalendarUrl(deadline: ApplicationDeadline): string {
  const title = encodeURIComponent(deadline.title);
  const details = encodeURIComponent(
    `${deadline.description}\n\nAction required: ${deadline.actionRequired}\nOfficial Link: ${deadline.link || 'https://hecas.moe.gov.bn'}`
  );
  const location = encodeURIComponent(deadline.institutionOrBody);

  // Format date: YYYYMMDD
  const cleanDate = deadline.date.replace(/-/g, '');
  const dates = `${cleanDate}/${cleanDate}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
}

export function downloadIcsFile(deadline: ApplicationDeadline) {
  const cleanDate = deadline.date.replace(/-/g, '');
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SuluhBrunei//Higher Education Navigator//EN',
    'BEGIN:VEVENT',
    `SUMMARY:${deadline.title}`,
    `DESCRIPTION:${deadline.description.replace(/\n/g, '\\n')} - Action: ${deadline.actionRequired.replace(/\n/g, '\\n')}`,
    `LOCATION:${deadline.institutionOrBody}`,
    `DTSTART;VALUE=DATE:${cleanDate}`,
    `DTEND;VALUE=DATE:${cleanDate}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${deadline.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
