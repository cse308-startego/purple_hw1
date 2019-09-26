package Application.Controllers;

import Models.Card;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "arr", method = RequestMethod.GET)
    public ResponseEntity<String> arrayManipulation(@RequestParam(value = "arr")Card[][] gameBoard) {

        System.out.println("Came here");
        String hi = "hello";
        return new ResponseEntity<String>(hi, HttpStatus.OK);
    }
}
