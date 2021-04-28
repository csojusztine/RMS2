package rms.rmsmysql.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rms.rmsmysql.entities.ConfirmationToken;
import rms.rmsmysql.entities.Machine;
import rms.rmsmysql.entities.User;
import rms.rmsmysql.entities.Work;
import rms.rmsmysql.entities.enums.Status;
import rms.rmsmysql.repository.MachineRepository;
import rms.rmsmysql.repository.WorkRepository;

import java.util.Optional;
import java.util.UUID;

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
            if(oWork.get().getMachines().isEmpty()) {
                workRepository.deleteById(id);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/machines")
    public ResponseEntity<Iterable<Machine>> getMachinesById(@PathVariable Integer id) {
        Optional<Work> oWork = workRepository.findById(id);
        if (oWork.isPresent()) {
            return ResponseEntity.ok(oWork.get().getMachines());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/addWork")
    public ResponseEntity<Work> addWork(@RequestBody Work work) {
        Work savedWork = workRepository.save(work);
        return ResponseEntity.ok(savedWork);
    }

}
