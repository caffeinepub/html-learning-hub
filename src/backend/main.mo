import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  type Lesson = {
    id : Nat;
    slug : Text;
    title : Text;
    difficulty : Text;
    description : Text;
    content : Text;
    codeExample : Text;
    order : Nat;
  };

  module Lesson {
    public func compareByOrder(a : Lesson, b : Lesson) : Order.Order {
      Nat.compare(a.order, b.order);
    };
  };

  // Pre-populated lessons
  let lessons = [
    {
      id = 1;
      slug = "introduction-to-html";
      title = "Introduction to HTML";
      difficulty = "Beginner";
      description = "Learn the basics of HTML and how to structure web pages.";
      content = "<h1>HTML Basics</h1><p>HTML stands for HyperText Markup Language...</p>";
      codeExample = "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n  </body>\n</html>";
      order = 1;
    },
    {
      id = 2;
      slug = "html-elements";
      title = "HTML Elements";
      difficulty = "Beginner";
      description = "Understand different HTML elements and their uses.";
      content = "<h2>HTML Elements</h2><p>Elements are building blocks of HTML...</p>";
      codeExample = "<p>This is a paragraph</p>\n<a href='https://example.com'>Link</a>";
      order = 2;
    },
    {
      id = 3;
      slug = "html-attributes";
      title = "HTML Attributes";
      difficulty = "Beginner";
      description = "Learn how to use attributes to provide additional information about elements.";
      content = "<h2>HTML Attributes</h2><p>Attributes help define element properties...</p>";
      codeExample = "<img src='image.jpg' alt='Sample Image'>";
      order = 3;
    },
    {
      id = 4;
      slug = "html-headings";
      title = "HTML Headings";
      difficulty = "Beginner";
      description = "Explore heading tags and their importance for structure.";
      content = "<h2>Headings</h2><p>Use H1 to H6 tags for headings...</p>";
      codeExample = "<h1>Main Title</h1>\n<h2>Subheading</h2>";
      order = 4;
    },
    {
      id = 5;
      slug = "html-paragraphs";
      title = "HTML Paragraphs";
      difficulty = "Beginner";
      description = "Understand how to use paragraphs for organizing text.";
      content = "<h2>Paragraphs</h2><p>Paragraph tags help separate text...</p>";
      codeExample = "<p>This is a paragraph of text</p>";
      order = 5;
    },
    {
      id = 6;
      slug = "html-lists";
      title = "HTML Lists";
      difficulty = "Beginner";
      description = "Learn how to create ordered and unordered lists.";
      content = "<h2>Lists</h2><p>Lists are useful for organizing content...</p>";
      codeExample = "<ul>\n  <li>Item 1</li>\n</ul>\n<ol>\n  <li>First</li>\n</ol>";
      order = 6;
    },
    {
      id = 7;
      slug = "html-links";
      title = "HTML Links";
      difficulty = "Intermediate";
      description = "Create hyperlinks to connect pages and resources.";
      content = "<h2>Links</h2><p>Use anchor tags for creating links...</p>";
      codeExample = "<a href='https://example.com'>Go to Example</a>";
      order = 7;
    },
    {
      id = 8;
      slug = "html-images";
      title = "HTML Images";
      difficulty = "Intermediate";
      description = "Learn how to add images to your web pages.";
      content = "<h2>Images</h2><p>Use img tag to display images...</p>";
      codeExample = "<img src='pic.jpg' alt='Picture'>";
      order = 8;
    },
    {
      id = 9;
      slug = "html-tables";
      title = "HTML Tables";
      difficulty = "Intermediate";
      description = "Organize data using tables in HTML.";
      content = "<h2>Tables</h2><p>Tables are great for displaying structured data...</p>";
      codeExample = "<table>\n  <tr><th>Name</th><th>Age</th></tr>\n  <tr><td>John</td><td>30</td></tr>\n</table>";
      order = 9;
    },
    {
      id = 10;
      slug = "html-forms";
      title = "HTML Forms";
      difficulty = "Intermediate";
      description = "Create interactive forms for user input.";
      content = "<h2>Forms</h2><p>Forms collect user input and send it to servers...</p>";
      codeExample = "<form>\n  <input type='text' name='name'>\n  <button type='submit'>Submit</button>\n</form>";
      order = 10;
    },
    {
      id = 11;
      slug = "html-semantics";
      title = "HTML Semantics";
      difficulty = "Advanced";
      description = "Use semantic tags for better structure and accessibility.";
      content = "<h2>Semantics</h2><p>Semantic tags improve readability and SEO...</p>";
      codeExample = "<article>\n  <header>My Article</header>\n</article>";
      order = 11;
    },
    {
      id = 12;
      slug = "html-multimedia";
      title = "HTML Multimedia";
      difficulty = "Advanced";
      description = "Add audio and video to your web pages.";
      content = "<h2>Multimedia</h2><p>HTML supports audio and video elements...</p>";
      codeExample = "<video src='movie.mp4' controls></video>\n<audio src='song.mp3' controls></audio>";
      order = 12;
    },
    {
      id = 13;
      slug = "html-iframes";
      title = "HTML Iframes";
      difficulty = "Advanced";
      description = "Embed external content using iframes.";
      content = "<h2>Iframes</h2><p>Iframes allow embedding other websites...</p>";
      codeExample = "<iframe src='https://example.com' width='600' height='400'></iframe>";
      order = 13;
    },
    {
      id = 14;
      slug = "html-meta-tags";
      title = "HTML Meta Tags";
      difficulty = "Advanced";
      description = "Use meta tags for SEO and better browser compatibility.";
      content = "<h2>Meta Tags</h2><p>Meta tags provide metadata about the document...</p>";
      codeExample = "<meta charset='UTF-8'>\n<meta name='description' content='My Webpage'>";
      order = 14;
    },
    {
      id = 15;
      slug = "html-best-practices";
      title = "HTML Best Practices";
      difficulty = "Advanced";
      description = "Learn best practices for writing clean and maintainable HTML code.";
      content = "<h2>Best Practices</h2><ul><li>Use semantic tags</li><li>Validate code</li><li>Optimize for accessibility</li></ul>";
      codeExample = "<nav>\n  <ul>\n    <li><a href='#'>Home</a></li>\n  </ul>\n</nav>";
      order = 15;
    },
  ];

  public query ({ caller }) func getAllLessons() : async [Lesson] {
    lessons.sort(Lesson.compareByOrder);
  };

  public query ({ caller }) func getLessonBySlug(slug : Text) : async Lesson {
    switch (lessons.find(func(lesson) { lesson.slug == slug })) {
      case (null) { Runtime.trap("Lesson not found") };
      case (?lesson) { lesson };
    };
  };

  public query ({ caller }) func searchLessons(keyword : Text) : async [Lesson] {
    lessons.filter(
      func(lesson) {
        lesson.title.contains(#text keyword) or
        lesson.description.contains(#text keyword)
      }
    );
  };
};
