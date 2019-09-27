package Application.Controllers;

import Models.Board;
import Models.Card;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;

@RestController
@RequestMapping("stratego")
public class Hello {
    @CrossOrigin
    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ResponseEntity<String> loginAttempt() {
        System.out.println("Came here");
        String hi = "hello";
        return new ResponseEntity<String>(hi, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "array", method = RequestMethod.POST)
    public ResponseEntity<String> arrayManipulation(@RequestBody String obj) {

        System.out.println(obj);
        System.out.println("Came here too");
        String hi = "hello";
        return new ResponseEntity<String>(hi, HttpStatus.OK);
    }
}
