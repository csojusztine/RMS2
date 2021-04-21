package rms.rmsmysql.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rms.rmsmysql.entities.Customer;
import rms.rmsmysql.entities.Machine;
import rms.rmsmysql.entities.User;
import rms.rmsmysql.entities.Work;
import rms.rmsmysql.entities.enums.Status;
import rms.rmsmysql.repository.MachineRepository;
import rms.rmsmysql.repository.UserRepository;
import rms.rmsmysql.repository.WorkRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/machines")
public class MachineController {

    @Autowired
    private WorkRepository workRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(MachineController.class);


    @Autowired
    private MachineRepository machineRepository;

    @GetMapping("")
    public ResponseEntity<Iterable<Machine>> getAll() {
        return ResponseEntity.ok(machineRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Machine> get(@PathVariable Integer id) {
        Optional<Machine> machine = machineRepository.findById(id);
        if (machine.isPresent()) {
            machine.get().setWorks(machine.get().getWorks());
            machine.get().setCustomer(machine.get().getCustomer());
            return ResponseEntity.ok(machine.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/user")
    public ResponseEntity<User> getUserByMachine(@PathVariable Integer id) {
        Optional<Machine> machine = machineRepository.findById(id);
        if (machine.isPresent()) {
            return ResponseEntity.ok(machine.get().getUser());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/customer")
    public ResponseEntity<Customer> getCustomerByMachine(@PathVariable Integer id) {
        Optional<Machine> machine = machineRepository.findById(id);
        if (machine.isPresent()) {
            return ResponseEntity.ok(machine.get().getCustomer());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{identifier}/machine")
    public ResponseEntity<Machine> getMachineByIdentifier(@PathVariable("identifier") UUID identifier) {
        Machine machine = machineRepository.findByIdentifier(identifier);
        System.out.println(identifier);
        System.out.println(machine);

        return ResponseEntity.notFound().build();
    }



    @GetMapping("/{id}/works")
    public ResponseEntity<Iterable<Work>>getWorkByMachine(@PathVariable Integer id) {
        Optional<Machine> machine = machineRepository.findById(id);
        if (machine.isPresent()) {
            return ResponseEntity.ok(machine.get().getWorks());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/identifier")
    public ResponseEntity<UUID> getIdentifierByMachine(@PathVariable Integer id) {
        Optional<Machine> machine = machineRepository.findById(id);
        if (machine.isPresent()) {
            return ResponseEntity.ok(machine.get().getIdentifier());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/addMachine")
    public ResponseEntity<Machine> post(@RequestBody Machine machine) {
        Machine savedMachine = machineRepository.save(machine);
        savedMachine.setStatus(Status.ON_WAITING_LIST);
        UUID identifier = UUID.randomUUID();
        System.out.println(identifier);
        savedMachine.setIdentifier(identifier);
        machineRepository.save(savedMachine);
        return ResponseEntity.ok(savedMachine);
    }

    @PostMapping("/{id}/work")
    public ResponseEntity<Machine> addWork(@PathVariable Integer id, @RequestBody Work work) {
        Optional<Machine> byId = machineRepository.findById(id);
        if (byId.isPresent()) {
            Machine machine = byId.get();
            Work newWork = workRepository.save(work);
            if(!machine.getWorks().contains(newWork)) {
                if(machine.getReparation_price() != null ) {
                    machine.setReparation_price(machine.getReparation_price() + newWork.getPrice());
                } else {
                    machine.setReparation_price(newWork.getPrice());
                }
                machine.getWorks().add(newWork);
                machineRepository.save(machine);
                workRepository.save(newWork);
                return ResponseEntity.ok(machine);
            } else {
                return ResponseEntity.badRequest().build();
            }



        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Machine> put(@RequestBody Machine machine, @PathVariable Integer id) {
        Optional<Machine> oMachine = machineRepository.findById(id);
        if(!(oMachine.get().getWorks().isEmpty())) {
            logger.info("helloka ez nem ures");
        }
        if (oMachine.isPresent()) {
            machine.setUser(oMachine.get().getUser());
            machine.setWorks(oMachine.get().getWorks());
            machine.setId(id);
            return ResponseEntity.ok(machineRepository.save(machine));
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<Machine> oMachine = machineRepository.findById(id);
        if (oMachine.isPresent()) {
            Machine m = oMachine.get();
            if(m.getStatus() != Status.ON_WAITING_LIST) {
                User u = m.getUser();
                u.getMachines().remove(m);
                userRepository.save(u);
            }

            machineRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}/deleteWork")
    public ResponseEntity deleteWorkfromMachine(@PathVariable Integer id, @RequestBody Work work) {
        Optional<Machine> oMachine = machineRepository.findById(id);
        if (oMachine.isPresent()) {
            Machine m = oMachine.get();
            Work deletedWork = workRepository.save(work);

            m.getWorks().remove(deletedWork);
            m.setReparation_price(m.getReparation_price() - deletedWork.getPrice());

            workRepository.save(deletedWork);
            machineRepository.save(m);

            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}/changeStatus")
    public ResponseEntity changeStatusToDone(@PathVariable Integer id){
        Optional<Machine> oMachine = machineRepository.findById(id);
        if (oMachine.isPresent()) {
            Machine m = oMachine.get();
            m.setStatus(Status.DONE);
            machineRepository.save(m);
            return ResponseEntity.ok().build();
        }  else {
            return ResponseEntity.notFound().build();
        }
    }




}
