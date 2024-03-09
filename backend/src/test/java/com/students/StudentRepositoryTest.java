package com.students;

import com.students.domain.Student;
import com.students.domain.StudentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class StudentRepositoryTest {
    @Autowired
    private StudentRepository repository;

    @Test
    void saveStudent() {
        repository.save(new Student("Bob", "Smith", "bob@test.com", "Computer Science", 412341, 3.9));
        assertThat(repository.findByFieldOfStudy("Computer Science")).isNotNull();

    }

    @Test
    void deleteStudent() {
        repository.save(new Student("John", "Doe", "john@test.com", "Physics", 323341, 3.7));
        repository.deleteAll();
        assertThat(repository.count()).isEqualTo(0);
    }
}
