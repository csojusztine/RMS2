package rms.rmsmysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rms.rmsmysql.entities.Machine;


public interface MachineRepository extends JpaRepository<Machine, Integer> {

}