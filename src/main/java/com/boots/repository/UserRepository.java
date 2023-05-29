package com.boots.repository;

import com.boots.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
    User findByUserEmailIgnoreCase(String emailId);
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
