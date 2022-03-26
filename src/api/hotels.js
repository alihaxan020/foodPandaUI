import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer 6hijtQIg-FhXVwkw1vgTlndHJnpBGA7tb_Z88AIr19U2M9cZImjZ2PlRgvcodVTKaEraMcCFpmnKZunGGZdmCUK4R31Ce1KGD-aZWGhSby8Kb6SOg7nmFUTkV5dgYXYx',
  },
});
