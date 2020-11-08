package rms.rmsmysql.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import rms.rmsmysql.entities.User;
import rms.rmsmysql.entities.enums.Role;
import rms.rmsmysql.repository.UserRepository;

import java.util.*;

@Service
public class MyUserDetailsService implements UserDetailsService//, ApplicationListener<AuthenticationSuccessEvent>
{

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(MyUserDetailsService.class);

    @Autowired
    private AuthenticatedUser authenticatedUser;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> oUser = userRepository.findByUsername(username);
        if (!oUser.isPresent()) {
            throw new UsernameNotFoundException(username);
        }
        User user = oUser.get();
        authenticatedUser.setUser(user);
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole().toString()));

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), grantedAuthorities);
    }

    /*@Override
    public void onApplicationEvent(AuthenticationSuccessEvent event) {
        UserDetails principal = (UserDetails) event.getAuthentication().getPrincipal();
        String username = principal.getUsername();
        logger.info("User successfully logged in, username: {}", username);
        List<String> roles = new ArrayList<>();
        principal.getAuthorities().forEach(o -> {
            String authority = o.getAuthority();
            roles.add(authority);
        });
        logger.info("User's authorities: {}", roles);
        Optional<User> byUsername = userRepository.findByUsername(username);
        if (byUsername.isPresent()) {
            User existingPerson = byUsername.get();
            Role newRole = detectRole(roles);
            if (!newRole.equals(existingPerson.getRole())) {
                existingPerson.setRole(newRole);
                userRepository.save(existingPerson);
            }
        } else {
            User newPerson = new User();
            newPerson.setUsername(username);
            newPerson.setRole(detectRole(roles));
            userRepository.save(newPerson);
        }

    }
    private Role detectRole(List<String> roles) {
        if (roles.contains("ROLE_ADMIN")) {
            return Role.ROLE_ADMIN;
        } else {
            return Role.ROLE_WORKER;
        }
    }*/
}