package rms.rmsmysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rms.rmsmysql.entities.Machine;

import java.util.Optional;
import java.util.UUID;


public interface MachineRepository extends JpaRepository<Machine, Integer> {

    Optional<Machine> findById(Integer id);

}