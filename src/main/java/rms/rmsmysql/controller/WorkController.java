package rms.rmsmysql.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rms.rmsmysql.entities.Work;
import rms.rmsmysql.repository.MachineRepository;
import rms.rmsmysql.repository.WorkRepository;

import java.util.Optional;

@RestController
@RequestMapping("/works")
public class WorkController {

    @Autowired
    private WorkRepository workRepository;

    @Autowired
    private MachineRepository machineRepository;

    @GetMapping("")
    public ResponseEntity<Iterable<Work>> getAll() {
        return ResponseEntity.ok(workRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Work> get(@PathVariable Integer id) {
        Optional<Work> work = workRepository.findById(id);
        if (work.isPresent()) {
            return ResponseEntity.ok(work.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /*@GetMapping("/{id}/machines")
    public ResponseEntity<Iterable<Machine>> getMachinesById(@PathVariable Integer id) {
        Optional<Work> work = workRepository.findById(id);
        if (work.isPresent()) {

            return ResponseEntity.ok(work.get().getMachines());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    /*@PostMapping("")
    public ResponseEntity<Building> post(@RequestBody Building building) {
        Building savedBuilding = buildingRepository.save(building);
        return ResponseEntity.ok(savedBuilding);
    }

    @PostMapping("/{id}/subjects")
    public ResponseEntity<Building> addSubject(@PathVariable Integer id, @RequestBody Subject subject) {
        Optional<Building> byId = buildingRepository.findById(id);
        if (byId.isPresent()) {
            Building building = byId.get();
            Subject newSubject = subjectRepository.save(subject);
            building.getSubjectList().add(newSubject);
            buildingRepository.save(building);
            newSubject.setBuilding(building);
            subjectRepository.save(newSubject);
            return ResponseEntity.ok(building);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<Building> put(@RequestBody Building building, @PathVariable Integer id) {
        Optional<Building> oBuilding = buildingRepository.findById(id);
        if (oBuilding.isPresent()) {
            building.setId(id);
            return ResponseEntity.ok(buildingRepository.save(building));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<Building> oBuilding = buildingRepository.findById(id);
        if (oBuilding.isPresent()) {
            int i = 0;
            for(Subject s: oBuilding.get().getSubjectList()) {
                for(User u : s.getUsers()) {
                    u.setSum_credit(u.getSum_credit() - s.getCredit());
                    u.removeSubject(s);
                }
            }
            buildingRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/
}
