export type PhotoOrientation = "landscape" | "portrait";

export type StoryChapter = {
  title: string;
  date: string;
  location: string;
  sentence: string;
  photo: {
    src: string;
    alt: string;
    position: string;
    orientation: PhotoOrientation;
  };
};

export const chapters = [
  {
    title: "The Day We Met",
    date: "May 7, 2017",
    location: "Central Park, New York",
    sentence: "One spring day in Central Park started a story neither of us could have imagined.",
    photo: {
      src: "/images/walk-in-the-park.jpg",
      alt: "Adam and Cathy together by the lake in Central Park",
      position: "50% 72%",
      orientation: "portrait",
    },
  },
  {
    title: "A Place of Our Own",
    date: "February 2019",
    location: "Brooklyn, New York",
    sentence: "We found our first home together and filled it with the beginnings of a shared life.",
    photo: {
      src: "/images/moved-to-brooklyn.jpg",
      alt: "Adam and Cathy together in their Brooklyn home",
      position: "50% 50%",
      orientation: "landscape",
    },
  },
  {
    title: "Atlanta Bound",
    date: "August 2020",
    location: "Atlanta, Georgia",
    sentence: "We packed up our life in New York and headed south for our next adventure.",
    photo: {
      src: "/images/moved-to-atlanta.jpg",
      alt: "Cathy celebrating beside the Welcome to Georgia sign",
      position: "50% 48%",
      orientation: "landscape",
    },
  },
  {
    title: "She Said Yes",
    date: "July 2024",
    location: "Central Park, New York",
    sentence: "Back where our story began, we decided to make forever official.",
    photo: {
      src: "/images/she-said-yes.jpg",
      alt: "Adam and Cathy celebrating their engagement in Central Park",
      position: "58% 60%",
      orientation: "landscape",
    },
  },
  {
    title: "And Then Came Charlie",
    date: "March 2025",
    location: "Atlanta, Georgia",
    sentence: "Charlie joined the family and quickly became the star of the show.",
    photo: {
      src: "/images/charlie-arrives.jpg",
      alt: "Adam holding puppy Charlie on the day she joined the family",
      position: "38% 82%",
      orientation: "portrait",
    },
  },
  {
    title: "We Tie the Knot",
    date: "May 8, 2027",
    location: "Atlanta, Georgia",
    sentence: "Ten years and one day after we met, we begin our next chapter together.",
    photo: {
      src: "/images/we-tie-the-knot.jpg",
      alt: "The Trolley Barn in Atlanta, Adam and Cathy's wedding venue",
      position: "50% 54%",
      orientation: "portrait",
    },
  },
] satisfies readonly StoryChapter[];
