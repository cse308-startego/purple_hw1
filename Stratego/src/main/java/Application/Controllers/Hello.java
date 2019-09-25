package Application.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("stratego")
public class Hello {
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ResponseEntity<String> loginAttempt() {
        System.out.println("Came here");
        String hi = "hello";
        return new ResponseEntity<String>(hi, HttpStatus.OK);
    }
}
