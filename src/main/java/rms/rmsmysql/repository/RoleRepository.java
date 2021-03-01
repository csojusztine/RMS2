package rms.rmsmysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rms.rmsmysql.entities.Role;
import rms.rmsmysql.entities.enums.EnumRole;

import java.util.Optional;


public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(EnumRole name);
}
