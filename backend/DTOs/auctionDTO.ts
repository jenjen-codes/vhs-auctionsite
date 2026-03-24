export type NewAuctionDTO = {
  title: string;
  year: number;
  description: string;
  minprice: number;
  current_price: number;
  image_url: string;
  end_time: Date;
};

export type UpdateAuctionDTO = {
  title: string;
  year: number;
  description: string;
  minprice: number;
  current_price: number;
  image_url: string;
  end_time: Date;
};
