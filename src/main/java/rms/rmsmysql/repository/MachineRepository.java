package rms.rmsmysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import rms.rmsmysql.entities.Machine;

import java.util.Optional;
import java.util.UUID;


public interface MachineRepository extends CrudRepository<Machine, Integer> {

    Optional<Machine> findById(Integer id);

    Machine findByIdentifier(UUID identifier);

}