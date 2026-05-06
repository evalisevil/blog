/*
  ActivityLog: description → message, kind 제거 (스키마와 일치)
*/
PRAGMA foreign_keys=OFF;

CREATE TABLE "ActivityLog_new" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "actorName" TEXT NOT NULL,
    "actorId" TEXT,
    CONSTRAINT "ActivityLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO "ActivityLog_new" ("id", "createdAt", "action", "message", "status", "actorName", "actorId")
SELECT "id", "createdAt", "action", "description", "status", "actorName", "actorId"
FROM "ActivityLog";

DROP TABLE "ActivityLog";
ALTER TABLE "ActivityLog_new" RENAME TO "ActivityLog";

CREATE INDEX "ActivityLog_createdAt_idx" ON "ActivityLog"("createdAt" DESC);
CREATE INDEX "ActivityLog_actorId_idx" ON "ActivityLog"("actorId");

PRAGMA foreign_keys=ON;
