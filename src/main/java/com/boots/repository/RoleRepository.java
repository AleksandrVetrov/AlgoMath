package com.boots.repository;


import com.boots.entity.EnumRole;
import com.boots.entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {
    Optional<Role> findByName(EnumRole name);

}
