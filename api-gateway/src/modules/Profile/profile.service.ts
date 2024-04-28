import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(private httpService: HttpService) {}

  async createProfile(aboutDto: any, params: any, token: string) {
    try {
      const data = this.httpService
        .post(`${process.env.SVC_DB_PROFILE}/api/v1/profile`, aboutDto, {
          params,
        })
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        )
        .toPromise();
      return data;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }

  async getProfile(params: any, token: string) {
    try {
      const data = this.httpService
        .get(`${process.env.SVC_DB_PROFILE}/api/v1/profile`, {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        )
        .toPromise();
      return data;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }

  async interest(dto: any, params: any, token: string) {
    try {
      const data = this.httpService
        .post(`${process.env.SVC_DB_PROFILE}/api/v1/profile/interest`, dto, {
          params,
        })
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            throw new HttpException(
              `${e.response.statusText} : ${e.response.data?.errorMessage}`,
              e.response.status,
            );
          }),
        )
        .toPromise();
      return data;
    } catch (error) {
      throw new HttpException(
        `${error.response.statusText} : ${error.response.data?.errorMessage}`,
        error.response.status,
      );
    }
  }
  // async updateProfile(updateDto: updateProfile, req: Request) {
  //   const user = req['user'];
  //   if (!user) {
  //     throw new Error('Unauthorized');
  //   }

  //   const date = new Date(updateDto.birthday);
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   let horoscope = '';
  //   if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
  //     horoscope = 'Aries';
  //   }
  //   if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
  //     horoscope = 'Taurus';
  //   }
  //   if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
  //     horoscope = 'Gemini';
  //   }
  //   if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
  //     horoscope = 'Cancer';
  //   }
  //   if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
  //     horoscope = 'Leo';
  //   }
  //   if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
  //     horoscope = 'Virgo';
  //   }
  //   if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
  //     horoscope = 'Libra';
  //   }
  //   if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) {
  //     horoscope = 'Scorpius';
  //   }
  //   if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
  //     horoscope = 'Sagittarius';
  //   }
  //   if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
  //     horoscope = 'Capricornus';
  //   }
  //   if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
  //     horoscope = 'Aquarius';
  //   }
  //   if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
  //     horoscope = 'Pisces';
  //   }
  //   let zodiac = '';
  //   const year = date.getFullYear();
  //   const Rat = [2020, 2008, 1996, 1984, 1972, 1960, 1948, 1936, 1924, 1912];
  //   const Ox = [2021, 2009, 1997, 1985, 1973, 1961, 1949, 1937, 1925, 1913];
  //   const Tiger = [2022, 2010, 1998, 1986, 1974, 1962, 1950, 1938, 1926, 1914];
  //   const Rabbit = [2023, 2011, 1999, 1987, 1975, 1963, 1951, 1939, 1927, 1915];
  //   const Dragon = [2012, 2000, 1988, 1976, 1964, 1952, 1940, 1928, 1916];
  //   const Snake = [2013, 2001, 1989, 1977, 1965, 1953, 1941, 1929, 1917];
  //   const Horse = [2014, 2002, 1990, 1978, 1966, 1954, 1942, 1930, 1918];
  //   const Goat = [2015, 2003, 1991, 1979, 1967, 1955, 1943, 1931, 1919];
  //   const Monkey = [2016, 2004, 1992, 1980, 1968, 1956, 1944, 1932, 1920];
  //   const Rooster = [2017, 2005, 1993, 1981, 1969, 1957, 1945, 1933, 1921];
  //   const Dog = [2018, 2006, 1994, 1982, 1970, 1958, 1946, 1934, 1922];
  //   const Pig = [2019, 2007, 1995, 1983, 1971, 1959, 1947, 1935, 1923];

  //   if (Rat.includes(year)) {
  //     zodiac = 'Rat';
  //   } else if (Ox.includes(year)) {
  //     zodiac = 'Ox';
  //   } else if (Tiger.includes(year)) {
  //     zodiac = 'Tiger';
  //   } else if (Rabbit.includes(year)) {
  //     zodiac = 'Rabbit';
  //   } else if (Dragon.includes(year)) {
  //     zodiac = 'Dragon';
  //   } else if (Snake.includes(year)) {
  //     zodiac = 'Snake';
  //   } else if (Horse.includes(year)) {
  //     zodiac = 'Horse';
  //   } else if (Goat.includes(year)) {
  //     zodiac = 'Goat';
  //   } else if (Monkey.includes(year)) {
  //     zodiac = 'Monkey';
  //   } else if (Rooster.includes(year)) {
  //     zodiac = 'Rooster';
  //   } else if (Dog.includes(year)) {
  //     zodiac = 'Dog';
  //   } else if (Pig.includes(year)) {
  //     zodiac = 'Pig';
  //   }

  //   const createProfile = await this.prisma.profile.update({
  //     where: {
  //       authorId: user.id,
  //     },
  //     data: {
  //       display_name: updateDto.display_name,
  //       gender: updateDto.gender,
  //       birthday: updateDto.birthday,
  //       horoscope: horoscope,
  //       zodiac: zodiac,
  //       height: Number(updateDto.heigth.toPrecision(2)),
  //       weight: Number(updateDto.weight.toPrecision(2)),
  //       authorId: user.id,
  //     },
  //   });

  //   return createProfile;
  // }

  // async interest(dto: string[], params: QueryParams) {
  //   try {
  //     const profile = await this.prisma.profile.findUnique({
  //       where: {
  //         authorId: params.userId,
  //       },
  //     });
  //     const updateInterest = {
  //       display_name: profile.display_name,
  //       gender: profile.gender,
  //       birthday: profile.birthday,
  //       horoscope: profile.horoscope,
  //       zodiac: profile.zodiac,
  //       height: profile.height,
  //       weight: profile.weight,
  //       image: profile.image,
  //       interest: dto,
  //       authorId: profile.authorId,
  //     };
  //     const createProfile = await this.prisma.profile.upsert({
  //       where: {
  //         authorId: params.userId,
  //       },
  //       create: updateInterest,
  //       update: updateInterest,
  //     });

  //     return createProfile;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
