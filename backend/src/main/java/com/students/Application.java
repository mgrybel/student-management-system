package com.students;

import com.students.domain.AppUser;
import com.students.domain.AppUserRepository;
import com.students.domain.Student;
import com.students.domain.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(
            Application.class
    );

    private final StudentRepository repository;
    private final AppUserRepository urepository;

    public Application(StudentRepository repository, AppUserRepository urepository) {

        this.repository = repository;
        this.urepository = urepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        logger.info("Application started");
    }

    @Override
    public void run(String... args) throws Exception {
        repository.save(new Student("John", "Doe", "john.doe@example.com", "Computer Science", 154732, 4));
        repository.save(new Student("Ann", "Smith", "ann.smith@example.com", "Mathematics", 131231, 3));
        repository.save(new Student("Bob", "Richardson", "bob.richardson@example.com", "Physics", 154219, 3 ));

        // Fetch all students and log to console
        for (Student student: repository.findAll()) {
            logger.info("First name: {}, Last name: {}, Field of study: {}", student.getFirstName(), student.getLastName(), student.getFieldOfStudy());
        }

        // Username: user, password: pass1234!A
        urepository.save(new AppUser("user", "$2a$10$5jQ9pO9WZ4lslt8kQqnX1OVonZmaztgRZDLDOlSs61k3QQHiZwJ9y", "USER"));

        // Username: admin, password: pass1234!A
        urepository.save(new AppUser("admin", "$2a$10$5jQ9pO9WZ4lslt8kQqnX1OVonZmaztgRZDLDOlSs61k3QQHiZwJ9y", "ADMIN"));
    }
}
