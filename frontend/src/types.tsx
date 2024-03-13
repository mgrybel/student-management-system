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
    profile: {
      href: string;
    };
    search: {
      href: string;
    };
  };
};
