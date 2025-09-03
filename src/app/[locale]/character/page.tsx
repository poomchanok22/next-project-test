"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCharacters } from "@/actions/getCharacters";
import { Card, Row, Col, Pagination } from "antd";
import { useTranslations } from "next-intl";

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
}

export default function CharacterPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const t = useTranslations("CharacterPage");

  useEffect(() => {
    getCharacters(page).then((data) => {
      setCharacters(data.results);
      setTotal(data.info.count);
    });
  }, [page]);

  return (
    <div className="p-4 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">{t("title", { page })}</h2>
      <Row gutter={[16, 16]}>
        {characters.map((char) => (
          <Col key={char.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Link href={`character/${char.id}`}>
              <Card
                hoverable
                cover={<img src={char.image} alt={char.name} />}
                className="shadow-md rounded-xl"
              >
                <Card.Meta
                  title={char.name}
                  description={`${t("speciesLabel")}: ${char.species}`}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          pageSize={20}
          total={total}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
