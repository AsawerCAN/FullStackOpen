const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ content }) => {
  return (
    <p>
      {content.name} {content.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce(
    (totalAccumulated, currentValue) =>
      totalAccumulated + currentValue.exercises,
    0
  );
  return <b>total of {totalExercises} exercises</b>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((value) => (
        <Part key={value.id} content={value} />
      ))}
      <Total parts={parts} />
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
