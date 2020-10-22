package rms.rmsmysql.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rms.rmsmysql.entities.Role;
import rms.rmsmysql.entities.User;
import rms.rmsmysql.repository.RoleRepository;


import java.util.Optional;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("")
    public ResponseEntity<Iterable<Role>> getAll() {
        return ResponseEntity.ok(roleRepository.findAll());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Role> get(@PathVariable Integer id) {
        Optional<Role> role = roleRepository.findById(id);
        if (role.isPresent()) {
            return ResponseEntity.ok(role.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}