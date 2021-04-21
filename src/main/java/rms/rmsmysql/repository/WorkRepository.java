package rms.rmsmysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.repository.CrudRepository;
import rms.rmsmysql.entities.Work;

public interface WorkRepository extends CrudRepository<Work, Integer> {

}