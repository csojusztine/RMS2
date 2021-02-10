package rms.rmsmysql.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import rms.rmsmysql.entities.Machine;
import rms.rmsmysql.entities.User;
import rms.rmsmysql.entities.enums.Role;
import rms.rmsmysql.entities.enums.Status;
import rms.rmsmysql.repository.MachineRepository;
import rms.rmsmysql.repository.UserRepository;
import rms.rmsmysql.security.AuthenticatedUser;

import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MachineRepository machineRepository;

    @Autowired
    private AuthenticatedUser authenticatedUser;


    @GetMapping("")
    public ResponseEntity<Iterable<User>> getAll() {
        return ResponseEntity.ok(userRepository.findAll());
    }



    //@Secured({ "ROLE_ADMIN" })
    @GetMapping("/{id}")
    public ResponseEntity<User> get(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //@Secured({ "ROLE_ADMIN", "ROLE_WORKER" })
    @PutMapping("/editUser/{id}")
    public ResponseEntity<User> put(@RequestBody User user, @PathVariable Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        //User _user = oUser.get();
        //User authenticated = authenticatedUser.getUser();
        if (oUser.isPresent() ) {//&& (authenticated.getRole().equals(Role.ROLE_ADMIN) || _user.getId() == authenticated.getId())){
            user.setId(id);
            return ResponseEntity.ok(userRepository.save(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //@Secured({ "ROLE_ADMIN" })
    @DeleteMapping("delete/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        User user = oUser.get();
        if (oUser.isPresent() && user.getMachines() != null) {
            for(Machine m : user.getMachines()) {
                m.setUser(null);
                m.setStatus(Status.RETURNED);
                machineRepository.save(m);
            }
            userRepository.deleteById(id);
            System.out.println("User deleted");
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        savedUser.setPassword("$2a$10$A/sHe5HY.A8XpqtKpBQil.f39XwK8AiFx3N3ey5/1szuuLjSHk16O");
        userRepository.save(savedUser);
        return ResponseEntity.ok(savedUser);
    }

    //@Secured({ "ROLE_ADMIN", "ROLE_WORKER" })
    @PostMapping("/{id}/machines")
    public ResponseEntity<User> addMachine(@PathVariable Integer id, @RequestBody Machine machine) {
        Optional<User> userID = userRepository.findById(id);
        if (userID.isPresent()) {
            User user = userID.get();
            Machine addedMachine = machineRepository.save(machine);
            user.getMachines().add(addedMachine);
            userRepository.save(user);
            addedMachine.setUser(user);
            addedMachine.setStatus(Status.UNDER_REPARATION);
            machineRepository.save(addedMachine);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //@Secured({ "ROLE_ADMIN", "ROLE_WORKER" })
    @DeleteMapping("/{id}/machine")
    public ResponseEntity deleteMachineFromUser(@PathVariable Integer id, @RequestBody Machine machine) {
        Optional<User> oUser = userRepository.findById(id);
        if (oUser.isPresent()) {
            User u = oUser.get();
            Machine deletedMachine = machineRepository.save(machine);
            u.getMachines().remove(deletedMachine);
            deletedMachine.setStatus(Status.RETURNED);
            deletedMachine.setUser(null);
            userRepository.save(u);
            machineRepository.save(deletedMachine);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User user) {
        return ResponseEntity.ok().build();
    }

}