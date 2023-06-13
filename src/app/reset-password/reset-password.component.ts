import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../login/authentication.service";
import { ConfirmationService } from "../app-modules/core/services/confirmation.service";

@Component({
  selector: "ResetComponent",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent {
  userFinalAnswers: any = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private confirmationService: ConfirmationService
  ) {}

  public response: any;
  public error: any;
  showQuestions: boolean = false;
  hideOnGettingQuestions: boolean = true;
  securityQuestions : any;
  answer: any = undefined;

  dynamictype: any = "password";

  public questions: any[] = [];
  public questionId: any[] = [];
  public userAnswers: any[] = [];

  wrong_answer_msg: any = "";

  getQuestions(username: any) {
    localStorage.setItem("userID", username);
    this.authService.getUserSecurityQuestionsAnswer(username).subscribe(
      (response: any) => {
        if (response !== undefined && response !== null) {
          this.handleSuccess(response.data);
        } else {
          this.confirmationService.alert(response.errorMessage);
        }
      },
      (error: any) => (this.error = <any>error)
    );
  }

  handleSuccess(data: any) {
    console.log(data);
    if (data !== undefined && data.forgetPassword !== "user Not Found") {
      if (data.SecurityQuesAns.length > 0) {
        this.securityQuestions  = data.SecurityQuesAns;
        this.showQuestions = true;
        this.hideOnGettingQuestions = false;

        this.splitQuestionAndQuestionID();
      } else {
        this.router.navigate(["/"]);
        this.confirmationService.alert(
          "Questions are not set for this User",
          "error"
        );
      }
    } else {
      this.router.navigate(["/"]);
      this.confirmationService.alert("User Not Found", "info");
    }
  }

  showPWD() {
    this.dynamictype = "text";
  }

  hidePWD() {
    this.dynamictype = "password";
  }

  splitQuestionAndQuestionID() {
    console.log("Q n A", this.securityQuestions );
    for (var i = 0; i < this.securityQuestions .length; i++) {
      this.questions.push(this.securityQuestions [i].question);
      this.questionId.push(this.securityQuestions [i].questionId);
    }
    console.log("questions", this.questions);
    console.log("questionId", this.questionId);
    this.showMyQuestion();
  }
  bufferQuestionId: any;
  bufferQuestion: any;
  counter: number = 0;
  showMyQuestion() {
    this.bufferQuestion = this.questions[this.counter];
    this.bufferQuestionId = this.questionId[this.counter];
  }
  nextQuestion() {
    if (this.counter < 3) {
      let reqObj = {
        "questionId": this.questionId[this.counter],
        "answer": this.answer,
      };
      this.userFinalAnswers.push(reqObj);
      this.wrong_answer_msg = "";
      this.counter = this.counter + 1;
      if (this.counter < 3) {
        this.showMyQuestion();
        this.answer = undefined;
      } else {
        this.validatingAnswers();
      }
    }
    console.log("user Final Answers are:", this.userFinalAnswers);
  }
  // For validating final answers, If all answers are correct need to pass transaction ID
  validatingAnswers() {
    this.authService
      .validateSecurityQuestionAndAnswer(
        this.userFinalAnswers,
        localStorage.getItem("userID")
      )
      .subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.counter = 0;
            this.router.navigate(["/set-password"]);
            this.authService.transactionId = response.data.transactionId;
          } else {
            this.getQuestions(localStorage.getItem("userID"));
			      this.onFailureNavigateToResetPassword(response);
          }
        },
        (error: any) => {
         this.onFailureNavigateToResetPassword(error);
        }
      );
    this.answer = null;
    this.userFinalAnswers = [];
  }
  onFailureNavigateToResetPassword(error) {
	this.showQuestions = true;
	this.counter = 0;
	this.confirmationService.alert(error.errorMessage, "error");
	this.router.navigate(["/reset-password"]);
	this.splitQuestionAndQuestionID();
  }
}
