package Application.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("stratego")
public class Hello {

    @RequestMapping("login")
    public String loginAttempt() {
        return "HI";
    }
}
