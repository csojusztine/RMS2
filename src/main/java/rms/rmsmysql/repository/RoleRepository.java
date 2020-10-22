package rms.rmsmysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rms.rmsmysql.entities.Role;


public interface RoleRepository extends JpaRepository<Role, Integer> {

}