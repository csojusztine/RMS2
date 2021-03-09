package rms.rmsmysql.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import rms.rmsmysql.entities.User;
import rms.rmsmysql.payload.JwtResponse;
import rms.rmsmysql.payload.LoginRequest;
import rms.rmsmysql.repository.RoleRepository;
import rms.rmsmysql.repository.UserRepository;
import rms.rmsmysql.security.CurrentUser;
import rms.rmsmysql.security.jwt.JwtUtils;
import rms.rmsmysql.security.services.UserDetailsImpl;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;



    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @GetMapping("/getLoggedUser")
    public ResponseEntity<CurrentUser> getAuthenticatedUser () {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CurrentUser current = new CurrentUser();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            current.setUsername(authentication.getName());
            current.setUser(userRepository.findByUsername(authentication.getName()).orElse(null));

        }
        return ResponseEntity.ok(current);
    }


}
