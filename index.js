// Your code here
const createEmployeeRecord = (employee) => {
  const [firstName, familyName, title, payPerHour] = employee;
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
};
const createEmployeeRecords = (employees) => {
  return employees.map(createEmployeeRecord);
};
const getDateAndHour = (dateStamp) => {
  const [date, hour] = dateStamp.split(" ");
  return [date, parseInt(hour, 10)];
};
const createTimeInEvent = (employeeRecord, dateStamp) => {
  const [date, hour] = getDateAndHour(dateStamp);
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: hour,
    date: date,
  });
  return employeeRecord;
};
const createTimeOutEvent = (employeeRecord, dateStamp) => {
  const [date, hour] = getDateAndHour(dateStamp);
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: hour,
    date: date,
  });
  return employeeRecord;
};
const hoursWorkedOnDate = (employeeRecord, soughtDate) => {
  const inEvent = employeeRecord.timeInEvents.find(
    (date) => date.date === soughtDate
  );
  const outEvent = employeeRecord.timeOutEvents.find(
    (date) => date.date === soughtDate
  );
  return (outEvent.hour - inEvent.hour) / 100;
};
const wagesEarnedOnDate = (employeeRecord, soughtDate) => {
  return parseFloat(
    hoursWorkedOnDate(employeeRecord, soughtDate) * employeeRecord.payPerHour
  );
};
const allWagesFor = (employeeRecord) => {
  const dates = employeeRecord.timeInEvents.map(
    (timeInEvent) => timeInEvent.date
  );
  const payable = dates.reduce((wage, date) => {
    return wage + wagesEarnedOnDate(employeeRecord, date);
  }, 0);
  return payable;
};
const calculatePayroll = (employeeRecords) => {
  return employeeRecords.reduce(
    (sum, employeeRecord) => sum + allWagesFor(employeeRecord),
    0
  );
};
