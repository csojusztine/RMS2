package rms.rmsmysql.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import rms.rmsmysql.entities.Machine;
import rms.rmsmysql.entities.User;
import rms.rmsmysql.entities.enums.Role;
import rms.rmsmysql.entities.enums.Status;
import rms.rmsmysql.repository.MachineRepository;
import rms.rmsmysql.repository.UserRepository;
import rms.rmsmysql.security.AuthenticatedUser;
import rms.rmsmysql.security.MyUserDetailsService;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MachineRepository machineRepository;

    @Autowired
    private AuthenticatedUser authenticatedUser;


    @Secured({ "ROLE_ADMIN" })
    @GetMapping("")
    public ResponseEntity<Iterable<User>> getAll() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @Secured({ "ROLE_ADMIN" })
    @GetMapping("/{id}")
    public ResponseEntity<User> get(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Secured({ "ROLE_ADMIN", "ROLE_WORKER" })
    @PutMapping("/{id}")
    public ResponseEntity<User> put(@RequestBody User user, @PathVariable Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        User _user = oUser.get();
        User authenticated = authenticatedUser.getUser();
        if (oUser.isPresent() && (authenticated.getRole().equals(Role.ROLE_ADMIN) || _user.getId() == authenticated.getId())){
            //System.out.println(_user.getId());
            //System.out.println(authenticated.getId());
            user.setId(id);
            return ResponseEntity.ok(userRepository.save(user));
        } else {
            System.out.println("A worker csak a saját adatát tudja megváltoztatni!");
            return ResponseEntity.notFound().build();
        }
    }

    @Secured({ "ROLE_ADMIN" })
    @DeleteMapping("/{id}")
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

    @Secured({ "ROLE_ADMIN" })
    @PostMapping("")
    public ResponseEntity<User> post(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @Secured({ "ROLE_ADMIN", "ROLE_WORKER" })
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

    @Secured({ "ROLE_ADMIN", "ROLE_WORKER" })
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

}