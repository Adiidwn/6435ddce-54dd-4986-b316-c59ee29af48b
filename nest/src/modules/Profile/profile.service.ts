import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AboutDto, updateProfile } from 'src/dto/about.dto';
import { QueryParams } from 'src/dto/request.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile(aboutDto: AboutDto, req: Request) {
    const user = req['user'];
    if (!user) {
      throw new Error('Unauthorized');
    }

    const date = new Date(aboutDto.birthday);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let horoscope = '';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      horoscope = 'Aries';
    }
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      horoscope = 'Taurus';
    }
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
      horoscope = 'Gemini';
    }
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
      horoscope = 'Cancer';
    }
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      horoscope = 'Leo';
    }
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      horoscope = 'Virgo';
    }
    if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
      horoscope = 'Libra';
    }
    if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) {
      horoscope = 'Scorpius';
    }
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      horoscope = 'Sagittarius';
    }
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      horoscope = 'Capricornus';
    }
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      horoscope = 'Aquarius';
    }
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      horoscope = 'Pisces';
    }
    let zodiac = '';
    const year = date.getFullYear();
    const Rat = [2020, 2008, 1996, 1984, 1972, 1960, 1948, 1936, 1924, 1912];
    const Ox = [2021, 2009, 1997, 1985, 1973, 1961, 1949, 1937, 1925, 1913];
    const Tiger = [2022, 2010, 1998, 1986, 1974, 1962, 1950, 1938, 1926, 1914];
    const Rabbit = [2023, 2011, 1999, 1987, 1975, 1963, 1951, 1939, 1927, 1915];
    const Dragon = [2012, 2000, 1988, 1976, 1964, 1952, 1940, 1928, 1916];
    const Snake = [2013, 2001, 1989, 1977, 1965, 1953, 1941, 1929, 1917];
    const Horse = [2014, 2002, 1990, 1978, 1966, 1954, 1942, 1930, 1918];
    const Goat = [2015, 2003, 1991, 1979, 1967, 1955, 1943, 1931, 1919];
    const Monkey = [2016, 2004, 1992, 1980, 1968, 1956, 1944, 1932, 1920];
    const Rooster = [2017, 2005, 1993, 1981, 1969, 1957, 1945, 1933, 1921];
    const Dog = [2018, 2006, 1994, 1982, 1970, 1958, 1946, 1934, 1922];
    const Pig = [2019, 2007, 1995, 1983, 1971, 1959, 1947, 1935, 1923];

    if (Rat.includes(year)) {
      zodiac = 'Rat';
    } else if (Ox.includes(year)) {
      zodiac = 'Ox';
    } else if (Tiger.includes(year)) {
      zodiac = 'Tiger';
    } else if (Rabbit.includes(year)) {
      zodiac = 'Rabbit';
    } else if (Dragon.includes(year)) {
      zodiac = 'Dragon';
    } else if (Snake.includes(year)) {
      zodiac = 'Snake';
    } else if (Horse.includes(year)) {
      zodiac = 'Horse';
    } else if (Goat.includes(year)) {
      zodiac = 'Goat';
    } else if (Monkey.includes(year)) {
      zodiac = 'Monkey';
    } else if (Rooster.includes(year)) {
      zodiac = 'Rooster';
    } else if (Dog.includes(year)) {
      zodiac = 'Dog';
    } else if (Pig.includes(year)) {
      zodiac = 'Pig';
    }
    const birthday = new Date(aboutDto.birthday);
    const findUser = await this.prisma.profile.findUnique({
      where: {
        authorId: user.payload.id,
      },
    });
    if (findUser) throw new Error('Profile already created');
    const createProfile = await this.prisma.profile.create({
      data: {
        display_name: aboutDto.display_name,
        gender: aboutDto.gender,
        birthday: birthday,
        horoscope: horoscope,
        zodiac: zodiac,
        height: Number(aboutDto.height),
        weight: Number(aboutDto.weight),
        authorId: user.payload.id,
      },
    });

    return createProfile;
  }

  async getProfile(params: QueryParams) {
    const skip = params.per_page * (params.page - 1);
    const take = params.per_page;

    let arrQuery = [];
    if (params.keyword) {
      arrQuery.push({
        display_name: {
          contains: params.keyword,
        },
      });
    }
    if (params.author_id) {
      arrQuery.push({
        authorId: params.author_id,
      });
    }
    const [total_data, data] = await this.prisma.$transaction([
      this.prisma.profile.count({
        where: {
          AND: arrQuery,
        },
      }),
      this.prisma.profile.findMany({
        where: {
          AND: arrQuery,
        },
        select: {
          display_name: true,
          gender: true,
          birthday: true,
          horoscope: true,
          zodiac: true,
          height: true,
          weight: true,
          authorId: true,
        },
        take,
        orderBy: {
          ceatedAt: 'desc',
        },
      }),
    ]);

    const datas = data.map((x) => {
      const birthday = new Date(x.birthday);
      const ageDate = new Date(Date.now() - birthday.getTime());
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      const formattedBirthday = `${birthday.getDate()}/${
        birthday.getMonth() + 1
      }/${birthday.getFullYear()}`;
      return {
        display_name: x.display_name,
        gender: x.gender,
        birthday: formattedBirthday,
        age: age,
        horoscope: x.horoscope,
        zodiac: x.zodiac,
        height: x.height + 'cm',
        weight: x.weight + 'kg',
        authorId: x.authorId,
      };
    });

    return {
      total_data,
      datas,
    };
  }

  async updateProfile(updateDto: updateProfile, req: Request) {
    const user = req['user'];
    if (!user) {
      throw new Error('Unauthorized');
    }

    const date = new Date(updateDto.birthday);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let horoscope = '';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      horoscope = 'Aries';
    }
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      horoscope = 'Taurus';
    }
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
      horoscope = 'Gemini';
    }
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
      horoscope = 'Cancer';
    }
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      horoscope = 'Leo';
    }
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      horoscope = 'Virgo';
    }
    if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
      horoscope = 'Libra';
    }
    if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) {
      horoscope = 'Scorpius';
    }
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      horoscope = 'Sagittarius';
    }
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      horoscope = 'Capricornus';
    }
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      horoscope = 'Aquarius';
    }
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      horoscope = 'Pisces';
    }
    let zodiac = '';
    const year = date.getFullYear();
    const Rat = [2020, 2008, 1996, 1984, 1972, 1960, 1948, 1936, 1924, 1912];
    const Ox = [2021, 2009, 1997, 1985, 1973, 1961, 1949, 1937, 1925, 1913];
    const Tiger = [2022, 2010, 1998, 1986, 1974, 1962, 1950, 1938, 1926, 1914];
    const Rabbit = [2023, 2011, 1999, 1987, 1975, 1963, 1951, 1939, 1927, 1915];
    const Dragon = [2012, 2000, 1988, 1976, 1964, 1952, 1940, 1928, 1916];
    const Snake = [2013, 2001, 1989, 1977, 1965, 1953, 1941, 1929, 1917];
    const Horse = [2014, 2002, 1990, 1978, 1966, 1954, 1942, 1930, 1918];
    const Goat = [2015, 2003, 1991, 1979, 1967, 1955, 1943, 1931, 1919];
    const Monkey = [2016, 2004, 1992, 1980, 1968, 1956, 1944, 1932, 1920];
    const Rooster = [2017, 2005, 1993, 1981, 1969, 1957, 1945, 1933, 1921];
    const Dog = [2018, 2006, 1994, 1982, 1970, 1958, 1946, 1934, 1922];
    const Pig = [2019, 2007, 1995, 1983, 1971, 1959, 1947, 1935, 1923];

    if (Rat.includes(year)) {
      zodiac = 'Rat';
    } else if (Ox.includes(year)) {
      zodiac = 'Ox';
    } else if (Tiger.includes(year)) {
      zodiac = 'Tiger';
    } else if (Rabbit.includes(year)) {
      zodiac = 'Rabbit';
    } else if (Dragon.includes(year)) {
      zodiac = 'Dragon';
    } else if (Snake.includes(year)) {
      zodiac = 'Snake';
    } else if (Horse.includes(year)) {
      zodiac = 'Horse';
    } else if (Goat.includes(year)) {
      zodiac = 'Goat';
    } else if (Monkey.includes(year)) {
      zodiac = 'Monkey';
    } else if (Rooster.includes(year)) {
      zodiac = 'Rooster';
    } else if (Dog.includes(year)) {
      zodiac = 'Dog';
    } else if (Pig.includes(year)) {
      zodiac = 'Pig';
    }

    const createProfile = await this.prisma.profile.update({
      where: {
        authorId: user.id,
      },
      data: {
        display_name: updateDto.display_name,
        gender: updateDto.gender,
        birthday: updateDto.birthday,
        horoscope: horoscope,
        zodiac: zodiac,
        height: Number(updateDto.heigth.toPrecision(2)),
        weight: Number(updateDto.weight.toPrecision(2)),
        authorId: user.id,
      },
    });

    return createProfile;
  }

  async interest(dto: string[], req: Request) {
    try {
      const user = req['user'];
      if (!user) {
        throw new UnauthorizedException('unknown user');
      }

      const createProfile = await this.prisma.profile.update({
        where: {
          authorId: user.payload.id,
        },
        data: {
          interest: {
            set: dto,
          },
        },
      });

      return createProfile;
    } catch (error) {
      throw error;
    }
  }
}
