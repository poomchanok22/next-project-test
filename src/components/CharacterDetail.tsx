"use client";

import { Card, Row, Col, List } from "antd";
import { useTranslations } from "next-intl";

interface CharacterType {
  id: string;
  name: string;
  image: string;
  species: string;
  gender: string;
  status: string;
  origin: { name: string };
  location: { name: string };
  episode: { id: string; name: string; episode: string }[];
}

export default function CharacterDetail({
  character,
}: {
  character: CharacterType;
}) {
  const t = useTranslations("CharacterDetail");
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">{character.name}</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card
            hoverable
            cover={<img src={character.image} alt={character.name} />}
            className="shadow-md rounded-xl"
          >
            <p>
              <strong>{t("species")}:</strong> {character.species}
            </p>
            <p>
              <strong>{t("gender")}:</strong> {character.gender}
            </p>
            <p>
              <strong>{t("status")}:</strong> {character.status}
            </p>
            <p>
              <strong>{t("origin")}:</strong> {character.origin.name}
            </p>
            <p>
              <strong>{t("location")}:</strong> {character.location.name}
            </p>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <h2 className="text-2xl font-semibold mb-3">{t("episodes")}</h2>
          <List
            bordered
            dataSource={character.episode}
            renderItem={(ep) => (
              <List.Item>
                {ep.episode} - {ep.name}
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </main>
  );
}
