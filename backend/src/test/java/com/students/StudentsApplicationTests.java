package com.students;

import com.students.web.StudentController;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class StudentsApplicationTests {
    @Autowired
    private StudentController controller;

    @Test
    @DisplayName("Test that the injected controller instance is not null")
    void contextLoads() {
        assertThat(controller).isNotNull();
    }
}
