package com.students.web;

import com.students.domain.Student;
import com.students.domain.StudentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {
    private final StudentRepository repository;

    public StudentController(StudentRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/students")
    public Iterable<Student> getStudents() {
        return repository.findAll();
    }
}
