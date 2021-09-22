import ReactHtmlParser from "react-html-parser";
import Image from "next/image";

export default function articlePreprocessor(article) {
  let output = [
    <h2 className="title-article" key={0}>
      {article.title}
    </h2>,
  ];
  let i = 0;
  for (let element of article.content) {
    const elementArray = element.split(" --- ");
    switch (elementArray[0]) {
      case "date and author":
        output.push(
          <div className="article-description-info d-flex" key={++i}>
            <div className="article-item-date d-flex justify-content-between align-items-center">
              <Image
                loading="eager"
                src="/Blog/calendar-1.png"
                alt="lịch"
                width={16}
                height={16}
              />
              <p>{elementArray[1]}</p>
            </div>
            <div className="article-item-author d-flex justify-content-between align-items-center">
              <Image
                loading="eager"
                src="/Blog/pen-1.png"
                alt="tác giả"
                width={16}
                height={16}
              />
              <p>{elementArray[2]}</p>
            </div>
          </div>
        );
        break;
      case "headerFig":
        output.push(
          <figure className="article-header-photo" key={++i}>
            <Image
              loading="eager"
              src={`${elementArray[2]}`}
              alt={`${elementArray[3]}`}
              layout="fill"
            />
            <figcaption>{elementArray[4]}</figcaption>
          </figure>
        );
        break;

      case "fig":
        output.push(
          <figure className="article-photo" key={++i}>
            <Image
              loading="eager"
              src={`${elementArray[2]}`}
              alt={`${elementArray[3]}`}
              layout="fill"
              objectFit="contain"
            />
            <figcaption>{elementArray[4]}</figcaption>
          </figure>
        );
        break;

      case "intro":
        output.push(
          <p className="article-header-intro" key={++i}>
            {elementArray[1]}
          </p>
        );
        break;

      case "para":
        output.push(
          <p className="article-paragraph" key={++i}>
            {elementArray[1]}
          </p>
        );
        break;

      case "paraTitle":
        output.push(
          <h3 className="article-title-part" key={++i}>
            {elementArray[1]}
          </h3>
        );
        break;

      case "YTVid":
        output.push(
          <div className="youtube-video-part" key={++i}>
            <iframe
              src={`${elementArray[2]}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>{elementArray[3]}</p>
          </div>
        );
        break;

      case "source":
        output.push(
          <p className="article-source" key={++i}>
            {elementArray[1]}
          </p>
        );
        break;
      default:
        break;
    }
  }

  return output;
}
