package rms.rmsmysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rms.rmsmysql.entities.Work;

public interface WorkRepository extends JpaRepository<Work, Integer> {

}