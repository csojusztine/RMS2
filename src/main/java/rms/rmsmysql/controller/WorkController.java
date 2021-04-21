package rms.rmsmysql.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rms.rmsmysql.entities.Machine;
import rms.rmsmysql.entities.User;
import rms.rmsmysql.entities.Work;
import rms.rmsmysql.repository.MachineRepository;
import rms.rmsmysql.repository.WorkRepository;

import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/api/works")
public class WorkController {

    @Autowired
    private WorkRepository workRepository;


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

    @PutMapping("/{id}")
    public  ResponseEntity<Work> put(@RequestBody Work work, @PathVariable Integer id) {
        Optional<Work> oWork = workRepository.findById(id);

        if (oWork.isPresent()) {
            work.setId(id);
            return ResponseEntity.ok(workRepository.save(work));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<Work> oWork = workRepository.findById(id);
        if (oWork.isPresent()) {
            workRepository.deleteById(id);
            return ResponseEntity.ok().build();

        }
        return ResponseEntity.notFound().build();
    }

}
