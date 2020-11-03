$(document).ready(function () {
    const newCommentForm = $(".new-comment-form");
    $(".sidenav").sidenav(); // Materialize functionality for sidenav
    $(".tabs").tabs(); // Materialize functionality for tabs on profile
    // $('#textarea1').val('New Text');
    // M.textareaAutoResize($('#textarea1'));
    $("input#input_text, textarea#textarea2").characterCounter();
  
    newCommentForm.on("submit", (event) => {
      console.log(this);
      event.preventDefault();
      console.log("clicked on submit comment");
      const newComment = {
        body: $(".comment-input").val().trim(),
      };
      console.log(newComment);
      $.ajax("/api/BlogPosts/comments", {
        method: "POST",
        data: newComment,
      }).then(() => {
        window.location.replace("/dashboard");
      });
    });
  });
  