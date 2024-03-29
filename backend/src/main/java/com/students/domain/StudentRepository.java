package com.students.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface StudentRepository extends CrudRepository<Student,Long> {
    // Fetch students by field of study
    List<Student> findByFieldOfStudy(@Param("fieldOfStudy") String fieldOfStudy);
}
