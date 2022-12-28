package com.boots.repository;


import com.boots.entity.EnumRole;
import com.boots.entity.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Optional<Role> findByName(EnumRole name);

}
