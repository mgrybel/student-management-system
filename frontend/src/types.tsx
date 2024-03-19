export type StudentResponse = {
  firstName: string;
  lastName: string;
  email: string;
  fieldOfStudy: string;
  studentNumber: number;
  gpa: number;
  _links: {
    self: {
      href: string;
    };
    student: {
      href: string;
    };
  };
};

export type Student = {
  firstName: string;
  lastName: string;
  email: string;
  fieldOfStudy: string;
  studentNumber: number;
  gpa: number;
};
